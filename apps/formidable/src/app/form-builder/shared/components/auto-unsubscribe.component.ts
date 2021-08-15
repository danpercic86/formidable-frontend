import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
export abstract class AutoUnsubscribeComponent implements OnDestroy {
  private readonly _subscriptions = new Subscription();

  set subscriptions(subscription: Subscription) {
    this._subscriptions.closed = false;
    this._subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
