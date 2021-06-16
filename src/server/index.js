'use strict';

const uniqBy = require('lodash/uniqBy');

function hasUploads(element) {
  return Array.isArray(element.data.uploads) && element.data.uploads.length;
}

function getContentReplaceArgs(upload, isLoading) {
  return isLoading
    ? [new RegExp(upload.key, 'gi'), upload.publicUrl]
    : [
      new RegExp(
        `(src\\s*=\\s*["'“”‘’])https?://\\b[^\\s]+${upload.key}[^\\s]*\\b(["'“”‘’])`,
        'gi'
      ),
      `$1${upload.key}$2`
    ];
}

function adjustContent(content, uploads, isLoading = false) {
  return content && uploads
    .filter(upload => upload.key && upload.publicUrl)
    .reduce(
      (acc, upload) => acc.replace(...getContentReplaceArgs(upload, isLoading)),
      content
    );
}

function processUploads(element, { storage }) {
  if (!hasUploads(element)) return element;
  const uniqueUploads = uniqBy(element.data.uploads, 'key');
  element.data.content = adjustContent(element.data.content, uniqueUploads);
  element.data.uploads = uniqueUploads.map(upload => {
    delete upload.publicUrl;
    return upload;
  });
  return element;
}

async function resolveUploads(element, { storage, storageProxy }) {
  if (!hasUploads(element)) return element;
  const { content, uploads } = element.data;
  await Promise.all(uploads.map(async upload => {
    if (!(await storage.fileExists(upload.key))) return;
    upload.publicUrl = await storageProxy.getFileUrl(upload.key);
  }));
  element.data.content = adjustContent(content, uploads, true);
  return element;
}

module.exports = {
  beforeSave: processUploads,
  afterLoaded: resolveUploads
};
