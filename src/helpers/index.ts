// fancy type to pull the props from a React component
// this means your tests can be typesafe too
export type ReactProps<T extends (...args: any) => any> = Parameters<T>[0];
