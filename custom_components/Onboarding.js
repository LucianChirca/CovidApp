/**
 * @Author: Lucian Chirca <Zombarian>
 * @Date:   2020-10-07T14:48:44+03:00
 * @Last modified by:   Zombarian
 * @Last modified time: 2020-10-21T18:21:19+03:00
 */

import React, { useState, useRef } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
} from 'react-native';

export default function Onboarding(props) {
  const { width } = useWindowDimensions();
  const { height } = useWindowDimensions();

  const {
    data,
    finishLabel,
    renderItem,
    onPageChange,
    onClose,
  } = props;

  const flatListRef = useRef(null);

  const [index, changeIndex] = useState(0);

  const translateXValue = new Animated.Value(0);

  const onMomentumScrollEnd = ({ nativeEvent }) => {
    const offset = nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / width);
    if (index !== newIndex) {
      if (onPageChange) {
        onPageChange(newIndex, index);
      }
      changeIndex(newIndex);
    }
  };

  const goToPage = (pageIndex) => {
    flatListRef.current.scrollToOffset({ offset: pageIndex * width });
  };

  const _renderItem = ({ item, index }) => (
    <View
      style={{
        width,
        height,
        alignItems: 'center',
        alignSelf: 'flex-end',
        flex: 1,
      }}
      key={item.title}
    >
      <View style={{ flex: 2.5, justifyContent: 'center' }}>
        {
      item.image && (<Image source={item.image} style={styles.imageStyle} />)
    }
      </View>
      <View style={{ justifyContent: 'flex-start', flex: 1 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 16,
            marginHorizontal: 16,
          }}
        >
          {item.title}
        </Text>
        <Text style={{ marginHorizontal: 16 }}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  const renderPagination = () => {
    const dotSize = 16;
    return (
      <View style={{
        flexDirection: 'row',
        marginBottom: 36,
        alignSelf: 'center',
      }}
      >
        {data.map((elem, i) => {
          const currentlyActive = index === i;
          const color = translateXValue.interpolate({
            inputRange: [(i - 1) * width, (i) * width, (i + 1) * width],
            outputRange: ['#a2a2a2', '#000', '#a2a2a2'],
            extrapolate: 'clamp',
          });
          return (
            <TouchableOpacity
              key={elem.title}
              style={{
                padding: 8,
              }}
              onPress={() => goToPage(i)}
            >
              <Animated.View style={{
                width: dotSize * 2,
                height: dotSize / 2,
                borderRadius: dotSize / 4,
                backgroundColor: color,
              }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderFinish = () => (
    <TouchableOpacity
      onPress={onClose}
      style={{
        position: 'absolute',
        right: 0,
        margin: 16,
      }}
    >
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
      }}
      >
        {finishLabel || 'FINISH'}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        snapToInterval={width}
        data={data}
        renderItem={renderItem || _renderItem}
        keyExtractor={(item, i) => i.toString()}
        bounces={false}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ref={flatListRef}
        style={{ flex: 1 }}
        scrollEventThrottle={14}
        onScroll={Animated.event([{
          nativeEvent: { contentOffset: { x: translateXValue } },
        }], { useNativeDriver: false })}
      />
      <View>
        {renderPagination()}
      </View>
      {index === data.length - 1 && renderFinish()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    width: 300,
    height: 300,
  },
});
