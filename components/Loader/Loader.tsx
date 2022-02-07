// @flow
import React from 'react';
import styles from './Loader.module.scss';
export function Loader() {
  return (
    <div className={`${styles.loaderRing} shadow-lg`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
