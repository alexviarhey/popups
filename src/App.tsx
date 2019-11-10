import React from 'react';
import './App.css';
import Popup from "./components/Popup";
import {connect} from 'react-redux';
import {IPopup} from "./types/popup-types";
import {AppStateType} from './redux/store';
import {addPopup} from './redux/popup-reducer';
import Buttons from "./components/Buttons";


interface IMapStateProps {
    popups: Array<IPopup>,
    id: number
}

interface IMapDispatchProps {
    addPopup: (popup: IPopup, id: number) => void
}

type CommonProps = IMapStateProps & IMapDispatchProps

const App = (props: CommonProps) => {

    const addCommonPopup = (title: string, type: string) => {
        const newPopup: IPopup = {
            id: props.id,
            title,
            type
        };
        props.addPopup(newPopup, props.id)
    }

    return (
        <div className='app'>
            <Buttons addCommonPopup={addCommonPopup}/>
            <div className='popups'>
                {props.popups.length > 0 && props.popups.map(p => <Popup key={p.id} type={p.type}>{p.title}</Popup>)}
            </div>
        </div>
    )
};


const mapStateToProps = (state: AppStateType): IMapStateProps => {
    return {
        id: state.popups.id,
        popups: state.popups.popups
    }
};

const mapDispatchToProps = (dispatch: any): IMapDispatchProps => {
    return {
        addPopup: (popup, id) => {
            dispatch(addPopup(popup, id))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App)