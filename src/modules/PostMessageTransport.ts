import { EventBus } from './EventBus';
import { Indexed } from '../types/common';
import { isObject } from '../utils/isObject';

export interface IPostMessage<T extends Indexed<any>> {
  action: string;
  backwardAction?: string;
  payload: T;
}

export class PostMessageTransport {
  protected eventBus: EventBus;

  constructor(
    protected iFrameSelector: string,
    protected targetOrigin: string = '*',
    protected isStrictMode = false,
  ) {
    this.eventBus = new EventBus(isStrictMode);
    window.addEventListener('message', this.messageHandler.bind(this));
  }

  public subscribe<T extends Indexed<any>>(
    action: string,
    callback: (payload: IPostMessage<T>) => void,
  ): this {
    this.eventBus.subscribe(action, callback);
    return this;
  }

  public unsubscribe(action: string, callback: (payload: any) => void): this {
    this.eventBus.unsubscribe(action, callback);
    return this;
  }

  public post<T extends Indexed<any>>({
    action,
    backwardAction,
    payload,
  }: IPostMessage<T>): this | never {
    const iFrame = this.getFrame();
    iFrame.contentWindow?.postMessage(
      { action, backwardAction, payload },
      this.targetOrigin,
    );
    return this;
  }

  protected messageHandler(event: MessageEvent): void | never {
    if (this.targetOrigin !== '*' && event.origin !== this.targetOrigin) {
      return;
    }

    if (isObject(event.data) && !('action' in event.data)) {
      if (this.isStrictMode) {
        this.raiseError('Invalid incoming post-message data');
      }
      return;
    }

    const payload = event.data as IPostMessage<any>;

    this.eventBus.emit(payload.action, payload);
  }

  protected raiseError(errorMessage: string): never {
    throw new Error(
      `${this.constructor.name}, id: "${this.iFrameSelector}": ${errorMessage}`,
    );
  }

  protected getFrame(): HTMLIFrameElement | never {
    const iFrame = document.querySelector(
      this.iFrameSelector,
    ) as HTMLIFrameElement;

    if (!iFrame) {
      this.raiseError('iframe element not found');
    }

    return iFrame;
  }
}
