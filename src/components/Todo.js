import React, {useState} from 'react';
/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';
/* ライブラリ */
import {getKey} from "../lib/util";
import useStorageTodo from "../hooks/storage_todo";
import Auth from "./Auth";
/*
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* カスタムフック */

function Todo() {
    const [items, addItem, updateItem, cleanItems] = useStorageTodo();

    const handleCheckTodoItem = (item) => {
        updateItem(item);
    };
    const handleAdd = (text) => {
        const newItem = {key: getKey(), text: text, done: false};
        addItem(newItem);
    };
    const [tab, setTab] = useState("すべて");
    const itemTab = () => {
        return items.filter((item) => {
            if (tab === "すべて") {
                return item;
            }
            if (tab === "未完了" && !item.done) {
                return item;
            }
            if (tab === "完了済み" && item.done) {
                return item;
            }
        });
    };
    const handleChangeTab = (target) => {
        setTab(target);
    };
    const handleCleanItem = () => {
        cleanItems();
    };
    return (
        <div className="panel">
            <Auth />
            <div className="panel-heading">
                ITSS ToDoアプリ
            </div>
            <Input onAdd={handleAdd}/>
            <Filter onClick={handleChangeTab}/>
            {itemTab().map(item => (
                <TodoItem item={item} key={item.key} onCheck={handleCheckTodoItem}/>
            ))}
            <div className="panel-block">
                {itemTab().length} items
            </div>
            <div className="panel-block">
                <button className="button is-light is-fullwidth" onClick={handleCleanItem}>全てのToDoを削除</button>
            </div>
        </div>
    );
}

export default Todo;
