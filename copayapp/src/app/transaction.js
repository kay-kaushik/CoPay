import './transaction.css';
export default function Transaction(props){
    return(
        <div className="transaction-container">
            <p className="amount">{props.amount}</p>
            <p className="description">{props.desc}</p>
            <p className="caculation">{props.calculation}</p>
        </div>
    );
}