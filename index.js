/*
* @flow
*/

import * as React from "react";
import {
  StyleSheet,
  SafeAreaView as AndroidSafeAreaView,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import IOSSafeAreaView from "react-native-safe-area-view";

const COLORS = {
  turquoise: "#00CDCE",
};

type _t_state = {
  image: ?string,
  barStyle: "dark-content" | "light-content",
  color?: string,
  setTopPadding: boolean
};

type _t_layout_state = {
  image?: string,
  barStyle?: "dark-content" | "light-content",
  color?: string,
  setTopPadding?: boolean,
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.turquoise,
    flex: 1,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  imageTop0: {
    top: 0,
  },
  imageTop20: {
    top: 20,
  },
  imageTop50: {
    top: 50,
    bottom: 50
  }
});

const Container = Platform.select({
  ios: IOSSafeAreaView,
  android: AndroidSafeAreaView
});

const iosSafeAreaViewProps = {
  forceInset: {
    right: "never",
    left: "never",
    top: "always",
    bottom: "always"
  }
};

const androidSafeAreaViewProps = {};

const safeAreaViewProps = Platform.select({
  ios: iosSafeAreaViewProps,
  android: androidSafeAreaViewProps
});

const withStatusBar = (color?: string) => (Component: React.ComponentType<any>) => class CustomStatusBar extends React.PureComponent<*, _t_state> {
    state = {
      image: null,
      barStyle: "dark-content",
      color,
      setTopPadding: false,
    };

    updateState = (params: _t_layout_state) => {
      this.setState(() => ({ ...params }));
    }

    render() {
      const rootStyle = { backgroundColor: color || COLORS.turquoise };
      const imageTop = this.state.setTopPadding ? ifIphoneX(styles.imageTop50, styles.imageTop20) : styles.imageTop0;
      return (
        <Container
          {...safeAreaViewProps}
          style={[styles.root, rootStyle]}
        >
          <Image
            source={this.state.image}
            style={[styles.image, imageTop]}
          />
          <StatusBar
            barStyle="light-content"
            backgroundColor={this.state.color || COLORS.turquoise}
          />
          <Component {...this.props} setStatusBarOptions={this.updateState} />
        </Container>
      );
    }
};

export default withStatusBar;
