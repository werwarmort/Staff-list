import React from 'react';
import { Outlet } from 'react-router';
import clsx from 'clsx';

import styles from './Layout.module.scss';

const Layout = (): React.ReactElement => {
  return (
    <main id="main" className={clsx(styles.root, {})}>
      <section className={styles.inner}>
        <header>header</header>
        <Outlet />
      </section>
      <section className={styles.footerWrapper}>footer</section>
    </main>
  );
};

export default Layout;
