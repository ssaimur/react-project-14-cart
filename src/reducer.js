

const reducer = (state, action) =>{

    if(action.type === 'CLEAR_CART'){
        return {...state, cart: []}
    }

    if(action.type === 'CLEAR_ITEM'){
        const remove = state.cart.filter(item => {
            return item.id !== action.payload;
        })
        return {...state, cart: remove }
    }

    if (action.type === 'INCREASE'){
        const increment = state.cart.map(item => {
            if (item.id === action.payload){
                return {...item, amount: item.amount + 1 }
            }
            return item;
        })
        return {...state, cart: increment}
    }

    if (action.type === 'DECREASE'){
        let increment = state.cart.map(item => {
            if (item.id === action.payload){
                return {...item, amount: item.amount - 1 }
            }
            return item;
        }).filter(item => {
            return item.amount > 0;
        })
        
        return {...state, cart: increment}
    }

    if (action.type === 'GET_TOTALS'){
        let {total, amount} = state.cart.reduce((acc, curr) => {
            const {price, amount} = curr;
            const sum = price * amount;
            acc.total += sum;
            acc.amount += amount;
            
            return acc;
        }, {
            total: 0,
            amount: 0
        })

        total = parseFloat(total.toFixed(2));

        return {...state, total, amount}
    }

    if (action.type === 'LOADING'){
        return {...state, loading: true}
    }

    if (action.type === 'DISPLAY_ITEMS'){
        return {...state, cart: action.payload, loading: false}
    }

    return state;
}


export default reducer;