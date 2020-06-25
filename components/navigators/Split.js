import { Layout, useStyleSheet } from "@ui-kitten/components";
import {
  NavigationHelpersContext,
  TabRouter,
  createNavigatorFactory,
  useNavigationBuilder
} from "@react-navigation/native";

import React from "react";
import themedStyles from "../../styles";

function SplitNavigator({ initialRouteName, children, screenOptions }) {
  const styles = useStyleSheet(themedStyles);
  const { state, navigation, descriptors } = useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName
  });

  const getFlexWidthStyles = (width) => {
    return width ? { width: width } : { flex: 1 };
  };

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <Layout style={styles.splitNavigator}>
        {state.routes.map((route) => (
          <Layout key={route.key} style={[styles.splitNavigatorColumn, getFlexWidthStyles(route.params?.width)]}>
            {descriptors[route.key].render()}
          </Layout>
        ))}
      </Layout>
    </NavigationHelpersContext.Provider>
  );
}

export const createSplitNavigator = createNavigatorFactory(SplitNavigator);
