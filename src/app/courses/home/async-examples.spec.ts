import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";


describe("Async Testing Examples", () => {
  it("Asynchronous test example with Jasmine fakeAsync", fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      console.log('running assertions');
      test = true;

    }, 1000);

    //triggering setTimeout function
    // tick(1000);
    flush();

    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example - plain Promise", fakeAsync(() => {
    let test = false;
    console.log('Creating promise');
    Promise.resolve().then(() => {
      console.log('Promise evaluate successfully');
      test = true;
    })
    flushMicrotasks();
    expect(test).toBeTruthy();

  }));

  it("Asynchronous test example - promises + setTimeout()", fakeAsync(() => {
    let counter = 0;

    Promise.resolve()
      .then(() => {
        counter += 10;
        setTimeout(() => {
          counter += 1;
        }, 1000);
      });
    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(1000);
    expect(counter).toBe(11);
  }));

  it("Asynchronour test example - Observables", fakeAsync(() => {
    let test = false;

    console.log('Creating Observable');

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    tick(1000);

    expect(test).toBe(true);
  }));

});
