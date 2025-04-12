"use client";
import Transaction from "./transaction";
import './main.css';

import { useState } from "react";
export default function Main(){

    const [transactions, setTransaction] = useState([{
        key:0,
        desc: "test desc",
        number: 100,
        calculation: "50 /50"
    }]);
    const [input, setInput] = useState("");
    const [amount, setAmount] = useState(0);
    const [members, setMembers] = useState([
        {
            name:"Kartik",
            owed:0
        },
        {
            name:"Zerish",
            owed:0
        }
    ]);

    const handleCalculation = (split) => {
        switch (split) {
            case "ypse":
                // Logic for when the user paid and wants to split equally
                const equalSplit = parseFloat(amount) / members.length;
                const updatedMembersEqual = members.map((member) => ({
                    ...member,
                    owed: member.name === 'kartik'? member.owed : member.owed + equalSplit
                }));
                setMembers(updatedMembersEqual);
                break;
            case "yofa":
                // Logic for when the user is owed the full amount
                const fullAmount = parseFloat(amount);
                const updatedMembersFull = members.map((member) => ({
                    ...member,
                    owed: member.owed - fullAmount
                }));
                setMembers(updatedMembersFull);
                break;
            case "tpse":
                // Logic for when Zerish paid and wants to split equally
                const zerishEqualSplit = parseFloat(amount) / members.length;
                const updatedMembersZerishEqual = members.map((member) => ({
                    ...member,
                    owed: member.owed + zerishEqualSplit
                }));
                setMembers(updatedMembersZerishEqual);
                break;
            case "tofa":
                // Logic for when Zerish is owed the full amount
                const zerishFullAmount = parseFloat(amount);
                const updatedMembersZerishFull = members.map((member) => ({
                    ...member,
                    owed: member.owed - zerishFullAmount
                }));
                setMembers(updatedMembersZerishFull);
                break;
            default:
                console.warn("Unknown split type");
                break;
        }
        const amountToAdd = parseFloat(amount) / 2;
        const updateMembers = members.map((member) => ({
            ...member,
            owed: member.owed + amountToAdd
        }));
        setMembers(updateMembers);
    }


    const addTransaction = (split) => {
        if (input.trim() != "" && amount.trim() != ""){
            const newTransaction = {
                key: transactions.length,
                desc: input,
                number: parseFloat(amount),
                calculation: "50/50"
            };
            handleCalculation(split);
            setTransaction([...transactions, newTransaction]);
            setInput("");
            setAmount("");
        }
        
    }

    return(
        <div className="home-container">
            <h1 className="heading">
                CoPay
            </h1>
            <p>description</p>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            <p>amount</p>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
            <button onClick={addTransaction("ypse")}>You paid, split equally</button>
            <button onClick={addTransaction("yofa")}>You are owed the full amount</button>
            <button onClick={addTransaction("tpse")}>Zerish paid, split equally</button>
            <button onClick={addTransaction("tofa")}>Zerish is owed the full amount</button>
            {members.map((member, index) => (
                <p key={index}>
                {member.name} owes {member.owed} 
                </p>

            ))}

            {transactions.map((t) => (
                <Transaction
                    key={t.key}
                    desc={t.desc}
                    amount={t.number}
                    calculation={t.calculation}
                />
            ))}
        </div>
    );
}