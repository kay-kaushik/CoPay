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

    const handleCalculation = (split) => {
        {/* write the algo for handle calc, we have split between now data, de struct it and use. Make use of a lgo by 
            gpt to calculate it and display owes and owed.  */}
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
            handleCalculation(split);
            setTransaction([...transactions, newTransaction]);
            setInput("");
            setAmount("");
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
