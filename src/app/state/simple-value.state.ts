import { Injectable } from "@angular/core";
import { Action, Selector, State,StateContext,StateToken } from "@ngxs/store";
import { DecrementValue, IncrementValue, ResetValue, SetValue } from "./simple-value.action";
import { SimpleValueModel } from "./simple-value.model";

const SIMPLE_VALUE_STATE_TOKEN= new StateToken<SimpleValueModel>(
    'SimpleValue'
);
@State<SimpleValueModel>({
    name:SIMPLE_VALUE_STATE_TOKEN,
    defaults:{
        value:0,
    },
})
@Injectable()
export class SimpleValueState{
    @Action(IncrementValue)
    IncrementValue(ctx: StateContext<SimpleValueModel>){
        const state=ctx.getState();
        let stateValue=state.value;
        stateValue++;
        ctx.setState({
            ...state,
            value:stateValue,
        });
        
    }
    @Action(DecrementValue)
    DecrementValue(ctx: StateContext<SimpleValueModel>){
        const state=ctx.getState();
        let stateValue=state.value;
        stateValue--;
        ctx.setState({
            ...state,
            value:stateValue,
        });
    }
    @Action(ResetValue)
    ResetValue(ctx: StateContext<SimpleValueModel>){
        const state=ctx.getState();
        let stateValue=state.value;
        ctx.setState({
            ...state,
            value:0,
        });
    }
    @Action(SetValue)
    SetValue(ctx: StateContext<SimpleValueModel>, action: SetValue){
        const state=ctx.getState();
        ctx.setState({
            ...state,
            value:action.payload,
        });
    }
    @Selector()
    static value(state:SimpleValueModel){
        return state.value;
    }

}