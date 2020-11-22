import {
  createLifecycleEventEmitter,
  LifecycleEventEmitter,
} from "./lifecycle/LifecycleEventEmitter";
import { LifecycleHookPlugin } from "./lifecycle/LifecycleHookPlugin";

/** @internal */
export class PluginManager {
  constructor(
    private readonly lifecycleEventEmitter = createLifecycleEventEmitter()
  ) {}

  public loadPlugins(plugins: LifecycleHookPlugin[]): void {
    for (const plugin of plugins) {
      plugin.initialise(this.lifecycleEventEmitter);
    }
  }

  public getEmitter(): LifecycleEventEmitter {
    return this.lifecycleEventEmitter;
  }
}
