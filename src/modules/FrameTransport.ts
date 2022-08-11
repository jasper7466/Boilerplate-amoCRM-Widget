import { indexed } from '../types/common';

export class FrameTransport {
  constructor(
    protected iFrameId: string,
    protected messagesHandlers: indexed<(data: indexed<any>) => void>,
    protected targetOrigin: string = '*',
  ) {
    window.addEventListener('message', this.inboxHandler);
  }

  protected raiseError(errorMessage: string): never {
    throw new Error(
      `${this.constructor.name}, id: "${this.iFrameId}": ${errorMessage}`,
    );
  }

  protected getFrame(): HTMLIFrameElement | never {
    const iFrame = document.querySelector(this.iFrameId) as HTMLIFrameElement;

    if (!iFrame) {
      this.raiseError('iframe element not found');
    }

    return iFrame;
  }

  postMessage(messageData: indexed<any>): void | never {
    // @ts-ignore
    this.messagesHandlers.test();

    const iFrame = this.getFrame();
    iFrame.contentWindow?.postMessage(messageData, this.targetOrigin);
  }

  inboxHandler(event: MessageEvent): void | never {
    if (this.targetOrigin !== '*' && event.origin !== this.targetOrigin) {
      return;
    }

    if (!('subject' in event.data)) {
      this.raiseError('no "subject" field in incoming message');
    }

    const subject = event.data.subject;

    if (!(subject in this.messagesHandlers)) {
      this.raiseError(`missing handler for "${subject}"`);
    }

    this.messagesHandlers[subject](event.data);
  }
}
