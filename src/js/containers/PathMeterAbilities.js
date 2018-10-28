import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../../css/components/PathMeterAbilities.css';

import AbilityMastery from './AbilityMastery';


class PathMeterAbilities extends Component {

  constructor(props) {
    super(props);
    this.renderAbility = this.renderAbility.bind(this);
  }

  renderAbility(obj) {
    const meterRequirement = obj.requirement;
    const levelProp = `lvl${obj.level}`;
    const pathMeter = this.props[`pathMeter${this.props.path.toUpperCase()}`];
    const abilityKey = `oa${this.props.abilities.mastery[this.props.path].optionalAbilities[levelProp]}`;
    const abilityData = this.props.abilities.indexed[this.props.abilities.mastery[this.props.path].optionalAbilities[levelProp]];
    return (
      <div className={css.ability} key={abilityKey}>
        <AbilityMastery
          masteryLevel={obj.level}
          data={abilityData}
          path={this.props.path}
          pathMeter={pathMeter}
          meterRequirement={meterRequirement}
        />
      </div>
    )
  }

  render() {
    const abilities = [
      {
        level: 7,
        requirement: 15
      },
      {
        level: 6,
        requirement: 13
      },
      {
        level: 5,
        requirement: 11
      },
      {
        level: 4,
        requirement: 9
      },
      {
        level: 3,
        requirement: 7
      },
      {
        level: 2,
        requirement: 5
      },
      {
        level: 1,
        requirement: 3
      }
    ];
    if (this.props.abilities.length == 0) {
      return null;
    }
    return (
      <div>
        <div className="column marginLeft--small">
          {
            abilities.map(i => this.renderAbility(i))
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps({ abilities, pathMeterA, pathMeterB, pathMeterC }) {
  return {
    abilities,
    pathMeterA,
    pathMeterB,
    pathMeterC
  };
}

export default connect(mapStateToProps, null)(PathMeterAbilities);
