import React, {PureComponent} from 'react';
import {range} from 'lodash/fp';
import play from './core';
import './index.css';

class Brag extends PureComponent {
    state = {
        player: 1,
        dice: 5,
        repeat: 10000,
        special: false,
        result: [0, 0, 0, 0, 0, 0]
    };

    handlePlayerChange = e => this.setState({player: e.target.value});
    handleDiceChange = e => this.setState({dice: e.target.value});
    handleRepeatChange = e => this.setState({repeat: e.target.value});
    handleSpecialChange = e => this.setState({special: e.target.checked});

    playOnce = () => {
        const {player, special, dice} = this.state;

        this.setState({
            result: play(player, special, dice)
        });
    }

    playAll = () => {
        const {player, special, dice, repeat} = this.state;
        const result = [0, 0, 0, 0, 0, 0];

        for (let i = 0; i < repeat; i++) {
            const temp = play(player, special, dice);

            for (let i = 0; i < 6; i++) {
                result[i] += temp[i];
            }
        }
        this.setState({result: result.map(i => i / repeat)});
    }

    render() {
        const {player, dice, special, repeat, result} = this.state;

        return (
            <div className="brag">
                <h1>Drinking Brag</h1>
                <h2>Options</h2>
                <div className="form">
                    <div>
                        <span>Player:</span>
                        <input type="number" value={player} onChange={this.handlePlayerChange} />
                    </div>
                    <div>
                        <span>Dice:</span>
                        <input type="number" value={dice} onChange={this.handleDiceChange} />
                    </div>
                    <div>
                        <span>Repeat:</span>
                        <input type="number" value={repeat} onChange={this.handleRepeatChange} />
                    </div>
                    <div>
                        <span>Special:</span>
                        <input type="checkbox" checked={special} onChange={this.handleSpecialChange} />
                    </div>
                    <button onClick={this.playOnce}>
                        Play Once
                    </button>
                    <button onClick={this.playAll}>
                        Play All
                    </button>
                </div>
                <h2>Result</h2>
                <table className="table">
                    <thead>
                        <tr>
                            {range(1, 7).map(i => <th key={i}>{i}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {result.map((v, i) => <td key={i}>{v}</td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Brag;

