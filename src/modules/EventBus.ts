type Callback = (...args: any[]) => void;
type ListenersList = Record<string, Callback[]>;

interface IEventBus {
  subscribe(event: string, callback: Callback): void;
  unsubscribe(event: string, callback: Callback): void;
  debugOn(): void;
  debugOff(): void;
}

export class EventBus implements IEventBus {
  protected listeners: ListenersList = {};
  protected debugMode = false;

  constructor(protected strictMode = false) {
    this.listeners = {};
    this.logger('New EventBus instance created');
  }

  subscribe(event: string, callback: Callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
    this.logger(`Event subscription (${event})`);
  }

  unsubscribe(event: string, callback: Callback) {
    this.checkEventExistence(event);
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
    this.logger(`Event unsubscription (${event})`);
  }

  emit(event: string, ...args: any[]) {
    this.logger(`Event triggered (${event})`);
    if (!this.checkEventExistence(event)) return;
    this.listeners[event].forEach((listener) => listener(...args));
  }

  debugOn() {
    this.debugMode = true;
  }

  debugOff() {
    this.debugMode = false;
  }

  protected logger(msg: string) {
    if (this.debugMode) {
      console.log(`${this.constructor.name}: ${msg}`);
    }
  }

  protected checkEventExistence(event: string): boolean | never {
    if (!this.listeners[event]) {
      if (this.strictMode)
        throw new Error(`Event listeners not found: ${event}`);
      else return false;
    }
    return true;
  }
}
