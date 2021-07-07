import autoBind from 'auto-bind';
import cuid from 'cuid';

class Loader {
  constructor(jodit) {
    this.jodit = jodit;
    autoBind(this);
  }

  show() {
    this.element = this.jodit.create.div('jodit_error_box_for_messages');
    this.jodit.workplace.appendChild(this.element);
    const dots = Array(3).fill().map(() => this.jodit.create.span('dot'));
    const text = this.jodit.create.text('Uploading');
    const content = this.jodit.create.div('active info load', [text, ...dots]);
    this.element.appendChild(content);
    return this;
  }

  hide() {
    const { Dom } = this.jodit.constructor.modules;
    Dom.safeRemove(this.element);
  }
}

/** @typedef {import('jodit').IJodit} Jodit */

export default class ImageUploaderPlugin {
  static get pluginName() {
    return 'image-uploader';
  }

  constructor(options) {
    options.uploadFilesEvent = options.uploadFilesEvent || 'joditUploadFiles';
    options.filesUploadEndedEvent = options.filesUploadEndedEvent || 'joditFilesUploadEnded';
    options.imagesAsBase64 = options.imagesAsBase64 || false;
    autoBind(this);
  }

  /**
   * @param {Jodit} jodit
   */
  init(jodit) {
    jodit.options.uploader.insertImageAsBase64URI = this.options.imagesAsBase64;
    if (this.options.imagesAsBase64) return;
    // Jodit shows upload tab if the url option for the Uploader module is defined, only checks if truthy
    jodit.options.uploader.url = Symbol('NONE');
    // Monkey patch the send method to provide uploading logic, original implementation utilizes the url option
    jodit.uploader.send = this.send;
  }

  /**
   * @param {FormData} data
   * @param {function} success
   */
  send(data, success) {
    const loader = new Loader(this.jodit).show();
    const opId = cuid();
    const deferred = {};
    const promise = new Promise(resolve => Object.assign(deferred, { resolve }));
    const finalize = ({ id: evtId, response }) => {
      if (evtId !== opId) return;
      this.jodit.events.off(this.options.filesUploadEndedEvent, finalize);
      if (response.err) console.error(response.err);
      const result = {
        ...(response.err
          ? {
            success: false,
            data: { messages: ['Failed to upload'] }
          }
          : {
            success: true,
            data: {
              files: response.files.map(file => file.publicUrl),
              isImages: Array.of(response.files.length).fill(true),
              baseurl: ''
            }
          })
      };
      success.call(this.jodit.uploader, result);
      loader.hide();
      deferred.resolve();
    };
    this.jodit.events.on(this.options.filesUploadEndedEvent, finalize);
    this.jodit.events.fire(this.options.uploadFilesEvent, { id: opId, formData: data });
    return promise;
  }
}
