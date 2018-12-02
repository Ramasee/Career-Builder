import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../../css/components/CoreMorales.css';

import AbilityMorale from './AbilityMorale';


class CoreMorales extends Component {

  constructor(props) {
    super(props);
    this.renderMorales = this.renderMorales.bind(this);
    this.renderMorale = this.renderMorale.bind(this);
  }

  renderMorale(abilityId) {
    return (
      <AbilityMorale key={abilityId} rank="4" data={this.props.abilities.indexed[abilityId]} />
    )
  }

  renderMorale4() {
    // Combine core and mastery tactics
    let combinedMorales = [];
    if (this.props.masteryMorales.length > 0) {
      combinedMorales = [...this.props.abilities.structured.coreMorales4, ...this.props.masteryMorales];
    } else {
      combinedMorales = this.props.abilities.structured.coreMorales4;
    }
    return combinedMorales.map(this.renderMorale);
  }
  
    renderMorale3() {
    // Combine core and mastery tactics
    let combinedMorales = [];
    if (this.props.masteryMorales.length > 0) {
      combinedMorales = [...this.props.abilities.structured.coreMorales3, ...this.props.masteryMorales];
    } else {
      combinedMorales = this.props.abilities.structured.coreMorales3;
    }
    return combinedMorales.map(this.renderMorale);
  }
  
    renderMorale2() {
    // Combine core and mastery tactics
    let combinedMorales = [];
    if (this.props.masteryMorales.length > 0) {
      combinedMorales = [...this.props.abilities.structured.coreMorales2, ...this.props.masteryMorales];
    } else {
      combinedMorales = this.props.abilities.structured.coreMorales2;
    }
    return combinedMorales.map(this.renderMorale);
  }
  
    renderMorale1() {
    // Combine core and mastery tactics
    let combinedMorales = [];
    if (this.props.masteryMorales.length > 0) {
      combinedMorales = [...this.props.abilities.structured.coreMorales1, ...this.props.masteryMorales];
    } else {
      combinedMorales = this.props.abilities.structured.coreMorales1;
    }
    return combinedMorales.map(this.renderMorale);
  }

  renderMorales() {
    return (
      <div className={css.moraleContainer}>
        <div className={css.moraleFirst}>
          <h3 className={css.moraleHeading}>Rank 1</h3>
          <div className="row">
            {this.renderMorale1()}
            )}
          </div>
        </div>
        <div className={css.morale}>
          <h3 className={css.moraleHeading}>Rank 2</h3>
          <div className="row">
            {this.renderMorale2()}
            )}
          </div>
        </div>
        <div className={css.morale}>
          <h3 className={css.moraleHeading}>Rank 3</h3>
          <div className="row">
            {this.renderMorale3()}
          </div>
        </div>
        <div className={css.moraleLast}>
          <h3 className={css.moraleHeading}>Rank 4</h3>
          <div className="row">
            {this.renderMorale4()}
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (this.props.abilities.length == 0) {
      return null;
    }
    return (
      <div className={css.container}>
        <h2 className={css.heading}>Morales</h2>
        {this.renderMorales()}
      </div>
    );
  }
}

function mapStateToProps({ abilities, masteryMorales }) {
  return {
    abilities,
    masteryMorales
  };
}

export default connect(mapStateToProps, null)(CoreMorales);
