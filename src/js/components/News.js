import React from 'react';
import IconChevronRight from '../icons/IconChevronRight';
import css from '../../css/components/News.css';

const News = () =>
  <div className={css.container}>
    <div className={css.heading}>Latest updates</div>
      <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>April 22, 2019</div>
      <span className={css.itemText}>Updated to current status/proposals</span>
    </div>
      <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>April 9, 2019</div>
      <span className={css.itemText}>Removed all the code name stuff.</span>
    </div>
      <div className={css.item}>
      <span className={css.itemIcon}><IconChevronRight classes="icon--small" name="right chevron icon" nameSlug="right-chevron-icon" /></span>
      <div className={css.itemDate}>April 9, 2019</div>
      <span className={css.itemText}>Stage 2 Alpha</span>
    </div>
</div>;
export default News;
