import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/sprite'
import UUID from 'uuid'
import { API_ENDPOINT } from '../adapters/index'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { colors } from '../App'

class SpriteBar extends Component{
  state = {
    selectedSpriteBar: null,
    filterBy: 'all',
    hover: false
  }

  componentDidMount(){
    fetch(`${API_ENDPOINT}/api/v1/sprites`)
      .then(r => r.json())
      .then(sprites => {
        this.props.setSprites(sprites)
      })
  }

  selectSprite = (sprite) => {
    this.setState({
      selectedSpriteBar: sprite
    })
  }

  hover = () =>{
    this.setState({
      hover: !this.state.hover
    })
  }

  sprites = () => {
    let sprites;
    if(this.state.filterBy === 'all'){
      sprites = this.props.sprites
    }else{
      sprites = this.props.sprites.filter(sprite => sprite.sprite_type === this.state.filterBy)
    }
    return sprites.map(sprite => {
      return (
        <Fragment key={sprite.id}>
          <img className={this.state.hover ? 'hover01-hover' : 'hover01'} onHover={this.hover} style={this.state.selectedSpriteBar === sprite ? {width:'60px', height:'60px', border:"3px solid black"} : {width:'60px', height:'60px'}} src={sprite.url} onClick={() => this.selectSprite(sprite)} alt={sprite.name} /><br/>
        </Fragment>
      )
      })
    }

    getSpriteTypes = () => {
      return (
        ['all',...new Set(this.props.sprites.map(item => item.sprite_type))].map(type => {
          return <MenuItem value={type}>{type.toUpperCase()}</MenuItem>
        })
      )
    }

    filterSprites = (e) => {
      this.setState({
        filterBy: e.target.value
      })
    }

  addSpriteMethod = () => {
    const uniqueKey = UUID()
    this.props.addSprite({sprite:this.state.selectedSpriteBar, uniqueKey: uniqueKey})
  }
//   <FormControl className="filter">
//   <InputLabel shrink htmlFor="filterBy">
//       IMAGES
//     </InputLabel>
//     <Select
//       value={this.state.filterBy}
//       onChange={this.filterSprites}
//       input={<Input name="filterBy" id="filterBy" />}
//       displayEmpty
//       name="age"
//     >
//       {this.getSpriteTypes()}
//     </Select>
// </FormControl>
  render(){
    console.log(this.props.sprites)
    return(
      <div id="spritebar">
        <div className="sidebar-nav">
          <FormControl className="filter">
          <InputLabel shrink htmlFor="filterBy">
              IMAGES
            </InputLabel>
            <Select
              value={this.state.filterBy}
              onChange={this.filterSprites}
              input={<Input name="filterBy" id="filterBy" />}
              displayEmpty
              name="age"
            >
              {this.getSpriteTypes()}
            </Select>
        </FormControl>
        </div>
        <div id='sprite-scroll'>
        {this.sprites()}
        </div>
        <MuiThemeProvider theme={colors}>
        <Button disabled={this.props.djMode ? true : false} onClick={this.addSpriteMethod} variant="contained" color="secondary">
        ADD
      </Button>
      </MuiThemeProvider>
      <br/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sprites: state.sprite.sprites,
    selectedSprite: state.sprite.selectedSprite,
    djMode: state.sound.djMode
  }
}

// function mapDispatchToProps(dispatch){
//   return {
//     addSprite: (selectedSprite) => {
//       dispatch(addSprite(selectedSprite))
//     }
//   }
// }

export default connect(mapStateToProps, actions)(SpriteBar);
