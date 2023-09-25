## React-color-spin-wheel


![Sep-25-2023 13-42-09](https://github.com/365support/react-color-spin-wheel/assets/86206374/ae5a593f-0973-4df6-9d94-8f0b989859b0)

## Installation

```
$ npm install --save react-color-spin-wheel
$ yarn add react-color-spin-wheel
```

## The gist

```jsx
function Wheel() {
  const wheelColors = ["MistyRose", "Wheat", "lightblue", "Khaki", "Lavender"];

  const [selectedColor, setSelectedColor] = useState("");

  return (
    <SpinWheel
      colors={wheelColors}
      lineWeight={4}
      onColorSelect={(color) => {
        setSelectedColor(color);
      }}
      initialRotationDegree={0}
      extractionDegrees={0}
      size={300}
    />
  );
}
```

## Documentation

Check the [documentation](https://react-color-spin-wheel.netlify.app/) to get you started!

## License

Licensed under MIT
