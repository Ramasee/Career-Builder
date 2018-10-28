import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../../css/components/SelectRenown.css';
import { calculateMasteryPoints } from '../helpers/points';

import { setRenown } from '../actions/actionRenown';
import { setPoints } from '../actions/actionPoints';
import { setCurrentPoints } from '../actions/actionCurrentPoints';
import { resetSelectedMorale1 } from '../actions/actionSelectedMorale1';
import { resetSelectedMorale2 } from '../actions/actionSelectedMorale2';
import { resetSelectedMorale3 } from '../actions/actionSelectedMorale3';
import { resetSelectedMorale4 } from '../actions/actionSelectedMorale4';
import { resetSelectedTactics } from '../actions/actionSelectedTactics';
import { resetPathMeterA } from '../actions/actionPathMeterA';
import { resetPathMeterB } from '../actions/actionPathMeterB';
import { resetPathMeterC } from '../actions/actionPathMeterC';
import { resetMasteryAbilities } from '../actions/actionMasteryAbilities';
import { resetMasteryMorales } from '../actions/actionMasteryMorales';
import { resetMasteryTactics } from '../actions/actionMasteryTactics';

class SelectRenown extends Component {

  constructor(props) {
    super(props);
    this.changeRenown = this.changeRenown.bind(this);
  }

  changeRenown() {

    // Reset selections
    this.props.resetSelectedMorale1();
    this.props.resetSelectedMorale2();
    this.props.resetSelectedMorale3();
    this.props.resetSelectedMorale4();
    this.props.resetSelectedTactics();
    this.props.resetPathMeterA();
    this.props.resetPathMeterB();
    this.props.resetPathMeterC();
    this.props.resetMasteryAbilities();
    this.props.resetMasteryMorales();
    this.props.resetMasteryTactics();
    this.props.setRenown(this.refs.renown.value);
    this.props.setPoints(calculateMasteryPoints(this.props.level, Number(this.refs.renown.value)));
    this.props.setCurrentPoints(calculateMasteryPoints(this.props.level, Number(this.refs.renown.value)));
    
    // TODO address the functions below
    //this.props.updateMasteryPoints();
  }

  render() {
    return (
      <div className={css.container}>
        <label className={css.label} htmlFor="renownSelect">Renown rank</label>
        <select
          ref="renown"
          onChange={this.changeRenown}
          className={css.select} id="renownSelect"
          value={this.props.renown}
        >
          <option value="40">40+</option>
          <option value="50">50+</option>
          <option value="60">60+</option>
          <option value="70">70+</option>
          <option value="10">&lt; 40</option>
        </select>
      </div>
    );
  }
}

function mapStateToProps({ level, renown }) {
  return {
    level,
    renown
  };
}

export default connect(mapStateToProps, { 
  setRenown,
  setPoints,
  setCurrentPoints,
  resetSelectedMorale1,
  resetSelectedMorale2,
  resetSelectedMorale3,
  resetSelectedMorale4,
  resetSelectedTactics,
  resetPathMeterA,
  resetPathMeterB,
  resetPathMeterC,
  resetMasteryAbilities,
  resetMasteryMorales,
  resetMasteryTactics
})(SelectRenown);
