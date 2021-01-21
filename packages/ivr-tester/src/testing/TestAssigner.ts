import { IvrTest } from "../handlers/TestInstanceClass";

export interface AssignedResult {
  isAssigned: boolean;
}

export interface TestAssigned extends AssignedResult {
  isAssigned: true;
  test: IvrTest;
}

export interface NoneAssigned extends AssignedResult {
  isAssigned: false;
  reason: string;
}

export interface TestAssigner {
  assign(): TestAssigned | NoneAssigned;
}
