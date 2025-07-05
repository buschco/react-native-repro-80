/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';

function Content() {
  const [mlayout, setMLayout] = React.useState<any>();
  const [olayout, setOLayout] = React.useState<any>();

  const targetRef = React.useRef<View>(null);

  React.useLayoutEffect(() => {
    targetRef.current?.measure((x, y, width, height) => {
      setMLayout({ width, height });
    });
  }, []);

  if (mlayout == null || olayout == null) {
    return (
      <View
        onLayout={l => {
          setOLayout(l.nativeEvent.layout);
        }}
        ref={targetRef}
        style={{ height: 100 }}
      />
    );
  }

  return (
    <>
      <Text>Should</Text>

      <View style={{ height: 100, backgroundColor: 'green' }} />

      <Text>
        actual (measure):{'\n'}
        width {mlayout.width} {'\n'}
        height: {mlayout.height}
      </Text>
      <View
        style={{
          width: mlayout.width,
          height: mlayout.height,
          backgroundColor: 'blue',
        }}
      />
      <Text>
        actual (onLayout):{'\n'}width {olayout.width}
        {'\n'}height: {olayout.height}
      </Text>
      <View
        style={{
          width: olayout.width,
          height: olayout.height,
          backgroundColor: 'red',
        }}
      />
    </>
  );
}

function App(): React.JSX.Element {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal visible={visible}>
        <View
          style={{
            paddingTop: 100,
            paddingHorizontal: 30,
          }}
        >
          <Content />
          <Button onPress={() => setVisible(false)} title="close" />
        </View>
      </Modal>
      <View style={{ flexGrow: 1, justifyContent: 'center' }}>
        <Content />
        <Button onPress={() => setVisible(true)} title="open" />
      </View>
    </>
  );
}

export default App;
