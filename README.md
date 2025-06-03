## Model

`ModelResponse` is what the backend returns
- We should only ever mock the `ModelResponse` and not the model


`Model` is what we work with on the frontend
- it should be stateless
- if we want a `getter` to have a specific value, NEVER mock it as that makes your model stateful and your test not fully valid. If you want a `getter` in a specific state, we need to mock the model fields to get us into that state.
- `createFromSource` a static function on our `Model` that will convert a `ModelResponse` into `Model`. This will usually be done when you call your API. `createFromSource` will call the `createFromSource` on sub `Model`s as required. You only ever need to go one deep as each nested `createFromSource` will handle all sub `Model`s

## Factories
Fishery is my go to library for mocking

https://github.com/thoughtbot/fishery

FakerJs is my go to for mock data

https://fakerjs.dev/


A factory is a helper class that will let us spit out a `ModelResponse` in the state we want.
`build` and `buildList` gives us a `ModelResponse` and `Array<ModelResponse>` respectively.

We add our own addition of `make` and `makeList` which we call when we want to have a `Model` instead of a `ModelResponse`

You will use `build` when you are mocking an API response as this will be the format that your backend send. You will also use `build` when working with other factories.

You should NEVER be passing around a `ModelResponse` in your app. only ever pass around a `Model`.

## Helpers
`ReactProps` is a cool helper function to let you pull the `Props` from a component.

## Component
Co locate your test beside your component, it's just easier and you can easily see which components are missing a test file

## Test

### `renderHelper`
You will be copying this into every single on of your tests, just swap out the two instances of `MyComponent` with your component name.
then in each test you'll call `renderHelper()`

If you are using redux or something, this is where you wrap your component in whatever providers you need

```TypeScript
type Props = ReactProps<typeof MyComponent>;

const DEFAULT_PROPS: Props = {
  // some props
};

const renderHelper = (partialProps: Partial<Props> = {}) => {
  const props: Props = {
    ...DEFAULT_PROPS,
    ...partialProps,
  };

  return render(<MyComponent {...props} />);
};
```

### Selectors

Your component code is going to be littered with `data-testid` attributes, this is how we are going to target sections of our app in our tests.
There are 3 types of querying these
- `get` for when we know it will exist in the dom
- `query` for when we are checking if it exists in the dom
- `find` async, will wait a bit before failing (allows rerenders)
docs here for more https://testing-library.com/docs/queries/about/

We want to create a constant for our selectors, so we don't have our tests littered with strings over and over. don't repeat yourself
```TypeScript
const SELECTORS = {
  getUserId: () => screen.getByTestId('user-id'),
  getUserName: () => screen.getByTestId('user-full-name'),
  queryUserAddress: () => screen.queryByTestId('user-address'),
};
```

## Services
This will be your API call, I've done it all sync here for easy of the demo

