import React from "react";

import HomepageBanner from "@/components/homepage/HomepageBanner";
import styles from "@/components/homepage/Homepage.module.css";
import Navbar from "@/components/homepage/Navbar";

export default function Homepage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <HomepageBanner />
    </div>
  );
}
