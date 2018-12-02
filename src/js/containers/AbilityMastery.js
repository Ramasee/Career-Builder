import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../../css/components/AbilityMastery.css';
import cssTactic from '../../css/components/AbilityTactic.css';
import cssMorale from '../../css/components/AbilityMorale.css';
import classNames from 'classnames';

import Popover from '../components/Popover';
import PopoverAbility from '../components/PopoverAbility';

import { addMasteryAbility, removeMasteryAbility } from '../actions/actionMasteryAbilities';
import { addMasteryMorale, removeMasteryMorale } from '../actions/actionMasteryMorales';
import { addMasteryTactic, removeMasteryTactic } from '../actions/actionMasteryTactics';
import { setPathMeterA } from '../actions/actionPathMeterA';
import { setPathMeterB } from '../actions/actionPathMeterB';
import { setPathMeterC } from '../actions/actionPathMeterC';
import { setCurrentPoints } from '../actions/actionCurrentPoints';
import { deselectTactic } from '../actions/actionSelectedTactics';
import { resetSelectedMorale4 } from '../actions/actionSelectedMorale4';

class AbilityMastery extends Component {

  /*
  status = enabled/disabled
  hovered = selected i.e. clicked
  selected = ability is currently in hover state
  */
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      hovered: false,
      selected: false
    };
    this.hoverOut = this.hoverOut.bind(this);
    this.hoverOver = this.hoverOver.bind(this);
    this.clicked = this.clicked.bind(this);
    this.processAbility = this.processAbility.bind(this);
  }

  processAbility(props) {

    // Create single variable for current ability's group
    let abilities = [];
    switch (props.data.abilityType) {
      case 'standard':
        abilities = props.masteryAbilities;
        break;
      case 'morale':
        abilities = props.masteryMorales;
        break;
      case 'morale':
        abilities = props.masteryMorales;
        break;
      case 'morale1':
        abilities = props.masteryMorales1;
        break;
      case 'morale2':
        abilities = props.masteryMorales2;
        break;
      case 'morale3':
        abilities = props.masteryMorales3;
        break;
      case 'morale4':
        abilities = props.masteryMorales4;
        break;
      case 'tactic':
        abilities = props.masteryTactics;
        break;
    }

    // Determine if ability is selected (i.e. highlighted)
    if (abilities.indexOf(props.data.id) !== -1) {
      this.setState({
        selected: true,
      });
    } else {
      this.setState({
        selected: false,
      });
    }

    let pathRequirement = Number(props.meterRequirement) + 1; 
    let pointsRequirement = 0; 
 
    if (Number(pathRequirement) > Number(props.pathMeter)) { 
      pointsRequirement = pathRequirement - Number(props.pathMeter); 
    } else { 
      pointsRequirement = 1; 
    }
 
    if (Number(props.currentPoints) >= Number(pointsRequirement)) {   
      this.setState({ 
        status: true
      }); 
    } else { 
      this.setState({ 
        status: false
      });
    }
  }

  hoverOver() {
    this.setState({
      hovered: true,
    });
  }

  hoverOut() {
    this.setState({
      hovered: false,
    });
  }

  clicked() {
    // Select ability i.e. not already selected
    if (this.state.selected === false) {
      // Active ability selected
      if (this.state.status) {
        if (Number(this.props.currentPoints) > 0) {
          // Add this ability to relevant mastery array
          switch (this.props.data.abilityType) {
            case 'standard':
              this.props.addMasteryAbility(this.props.masteryAbilities, this.props.data.id);
              break;
            case 'morale':
              this.props.addMasteryMorale(this.props.masteryMorales, this.props.data.id);
              break;
            case 'tactic':
              this.props.addMasteryTactic(this.props.masteryTactics, this.props.data.id);
              break;
          }
          // If the path meter is below requirement for this ability, bring path meter up to the requirement
          if (Number(this.props.pathMeter) < Number(this.props.meterRequirement)) {
            // Calculate how many points are required to bring the path meter up to the minimum requirement
            let masteryDifference = Number(this.props.pathMeter) - Number(this.props.meterRequirement);
            // Remove one more point for the current selection
            masteryDifference--;
            // Re-calculate new current points total
            masteryDifference = Number(this.props.currentPoints) + (Number(masteryDifference));
            // Set current points
            this.props.setCurrentPoints(masteryDifference);
            // Set path points depending on which path
            switch (this.props.path) {
              case 'a':
                this.props.setPathMeterA(this.props.meterRequirement);
                break;
              case 'b':
                this.props.setPathMeterB(this.props.meterRequirement);
                break;
              case 'c':
                this.props.setPathMeterC(this.props.meterRequirement);
                break;
            }
          } else {
            // Otherwise decrement mastery total as normal
            this.props.setCurrentPoints(this.props.currentPoints - 1);
          }
        }
      }
      // else {} = Inactive ability selected
    // Unselect ability
    } else {
      // Remove this ability from relevant mastery array
      switch (this.props.data.abilityType) {
        case 'standard':
          this.props.removeMasteryAbility(this.props.masteryAbilities, this.props.data.id);
          break;
        case 'morale':
          this.props.removeMasteryMorale(this.props.masteryMorales, this.props.data.id);
          // remove from selected morale 4
          if (this.props.selectedMorale4 == this.props.data.id) {
            this.props.resetSelectedMorale4();
          }
          break;
        case 'tactic':
          this.props.removeMasteryTactic(this.props.masteryTactics, this.props.data.id);
          // remove from selected tactics if it's there
          if (this.props.selectedTactics.indexOf(this.props.data.id) !== -1) {
            this.props.deselectTactic(this.props.selectedTactics, this.props.data.id);
          }
          break;
      }
      // Increment mastery total as normal
      this.props.setCurrentPoints(this.props.currentPoints + 1);
    }
  }

  // Initial render
  componentDidMount() {
    this.processAbility(this.props);
  }

  // About to update because parent changed
  componentWillReceiveProps(nextProps, nextState) {
    if (this.props != nextProps) {
      this.processAbility(nextProps);
      
      // Meter level goes below optional Ability requirement
      // Ability must be deactivated and Mastery points updated
      // e.g. meter level 3, lvl1 path ability selected. Go to level 2, deselect
      // and deactive ability and add point back for meter decrement PLUS deselected ability
      if (this.state.selected &&
        Number(nextProps.pathMeter) > 0 &&
        Number(nextProps.pathMeter) < Number(nextProps.meterRequirement)) {
        this.setState({
          status: false,
          selected: false,
        });
        // Remove this ability from relevant mastery array
        switch (nextProps.data.abilityType) {
          case 'standard':
            nextProps.removeMasteryAbility(nextProps.masteryAbilities, nextProps.data.id);
            break;
          case 'morale':
            nextProps.removeMasteryMorale(nextProps.masteryMorales, nextProps.data.id);
            // remove from selected morales if it's there
            if (nextProps.selectedMorale4 == nextProps.data.id) {
              nextProps.resetSelectedMorale4(nextProps.selectedMorales, nextProps.data.id);
            }
            break;
          case 'tactic':
            nextProps.removeMasteryTactic(nextProps.masteryTactics, nextProps.data.id);
            // remove from selected tactics if it's there
            if (nextProps.selectedTactics.indexOf(nextProps.data.id) !== -1) {
              nextProps.deselectTactic(nextProps.selectedTactics, nextProps.data.id);
            }
            break;
        }
        // Increment mastery total as normal
        nextProps.setCurrentPoints(nextProps.currentPoints + 1);
      }
    }
  }

  render() {
    const abilityClass = classNames({
      [css.abilityStandard]: !this.state.status && !this.state.selected && (this.props.data.abilityType === 'standard'),
      [css.abilityStandardActive]: this.state.status && !this.state.selected && (this.props.data.abilityType === 'standard'),
      [css.abilityStandardSelected]: this.state.selected && (this.props.data.abilityType === 'standard'),
      [cssMorale.ability]: !this.state.status && !this.state.selected && (this.props.data.abilityType === 'morale'),
      [cssMorale.abilityMasteryActive]: this.state.status && !this.state.selected && (this.props.data.abilityType === 'morale'),
      [cssMorale.abilityMasterySelected]: this.state.selected && (this.props.data.abilityType === 'morale'),
      [cssTactic.ability]: !this.state.status && !this.state.selected && (this.props.data.abilityType === 'tactic'),
      [cssTactic.abilityMasteryActive]: this.state.status && !this.state.selected && (this.props.data.abilityType === 'tactic'),
      [cssTactic.abilityMasterySelected]: this.state.selected && (this.props.data.abilityType === 'tactic'),
      'is-hovered': this.state.hovered,
      popover__parent: true,
    });
    const abilityImageClass = classNames({
      [css.imageStandard]: !this.state.selected && (this.props.data.abilityType === 'standard'),
      [css.imageStandardSelected]: this.state.selected && (this.props.data.abilityType === 'standard'),
      [cssMorale.imageInactive]: !this.state.selected && (this.props.data.abilityType === 'morale'),
      [cssMorale.image]: this.state.selected && (this.props.data.abilityType === 'morale'),
      [cssTactic.imageInactive]: !this.state.selected && (this.props.data.abilityType === 'tactic'),
      [cssTactic.image]: this.state.selected && (this.props.data.abilityType === 'tactic'),
    });

    const imgSrc = `../../images/abilities/${this.props.data.image}.png`;
    const popoverContent = (
      <PopoverAbility data={this.props.data} imgSrc={imgSrc} />
    );
    return (
      <div className={abilityClass} ref="popoverParent">
        <img
          className={abilityImageClass}
          src={imgSrc}
          alt={this.props.data.name}
          onMouseOver={this.hoverOver}
          onMouseOut={this.hoverOut}
          onClick={this.clicked}
        />
        <Popover
          content={popoverContent}
          alignment="top"
          activate={this.state.hovered}
          abilityOptional={false}
          status={this.state.status}
        />
      </div>
    );
  }
}

function mapStateToProps(
  { 
    masteryAbilities, 
    masteryTactics, 
    masteryMorales, 
    currentPoints,
    pathMeterA,
    pathMeterB,
    pathMeterC,
    selectedTactics,
    selectedMorale4
  }
) 
  {
  return {
    masteryAbilities,
    masteryTactics,
    masteryMorales,
    currentPoints,
    pathMeterA,
    pathMeterB,
    pathMeterC,
    selectedTactics,
    selectedMorale4
  };
}

export default connect(mapStateToProps, {
  addMasteryAbility,
  removeMasteryAbility,
  addMasteryMorale,
  removeMasteryMorale,
  addMasteryTactic,
  removeMasteryTactic,
  setPathMeterA,
  setPathMeterB,
  setPathMeterC,
  setCurrentPoints,
  deselectTactic,
  resetSelectedMorale4
})(AbilityMastery);
