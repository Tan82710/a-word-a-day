import { Counter, APPLICATION_URL } from "../model";

const counter = new Counter();

fixture("Counter").page(APPLICATION_URL + "/counter");

test("The user should land on the list page", async () => {
  await counter.expectValueToEqual(0);
  await counter.increment();
  await counter.expectValueToEqual(1);
});
