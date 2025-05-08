"use client";
import Transaction from "./transaction";
import './main.css';

import { useState } from "react";

export default function Main() {
    const [groupMen, setGroupMen] = useState([
        { name: "kartik", owes: 0, owed: 0 },
        { name: "zerish", owes: 0, owed: 0 },
        { name: "vandan", owes: 0, owed: 0 },
      ]);

    const [selectedPartners, setSelectedPartners] = useState([]);
    const [transactions, setTransaction] = useState([{
        key: 0,
        desc: "test desc",
        number: 100,
        calculation: "50/50"
    }]);
    const [input, setInput] = useState("");
    const [amount, setAmount] = useState(0);

    const handlePartnerChange = (partner) => {
        setSelectedPartners((prev) =>
            prev.includes(partner)
                ? prev.filter((p) => p !== partner)
                : [...prev, partner]
        );
    };

    const handleCalculation = (transaction) => {
        {/* for now there is no paid by feild yet, we assume paid by user whihc is me kay. */}
        
        const {number,splitbetween} = transaction;
        const amount = number; 
        const share = amount / splitbetween.length;

        const updatedGroup = groupMen.map((member) => {
            if(splitbetween.includes(member.name)){
                if(member.name === "kartik"){
                    return{...member, owed: member.owed + (amount - share)};
                }
                else{
                    return{...member, owes: member.owes + share};
                }
            }
            return member;
        })

        setGroupMen(updatedGroup);
        
    };

    const addTransaction = (split) => {
        if (input.trim() !== "" && amount !== "") {
            const newTransaction = {
                key: transactions.length,
                desc: input,
                number: parseFloat(amount),
                splitbetween: selectedPartners,
                calculation: "50/50"
            };
            setTransaction([...transactions, newTransaction]);
            handleCalculation(newTransaction);
            setInput("");
            setAmount("");
            setSelectedPartners([]);
        }
    };

    return (
        <div className="home-container">
            <h1 className="heading">
                Running Balance
            </h1>
            <p>Description</p>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} />
            <p>Amount</p>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

            {groupMen.map((men, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        value={men.name}
                        checked={selectedPartners.includes(men.name)}
                        onChange={() => handlePartnerChange(men.name)}
                    />
                    {men.name}
                </div>
            ))}

            <button onClick={() => addTransaction("ypse")}>You paid, split equally</button>

            <h1>running balance</h1>
            {groupMen.map((men)=> (
                <h3 key = {men.name}> {men.name} owes ${men.owes} and is owed ${men.owed}</h3>
            ))}

            <h2>Transactions:</h2>
            {transactions.map((t) => (
                <Transaction
                    key={t.key}
                    desc={t.desc}
                    amount={t.number}
                    splitbetween={t.splitbetween}
                    calculation={t.calculation}
                />
            ))}
        </div>
    );
}
