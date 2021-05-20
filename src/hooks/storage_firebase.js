import { useState, useEffect } from 'react';
import {db} from '../lib/firebase'
/*
  【Storageフック】
　・TodoをlocalStorageを使って保存する
　・以下機能をサポートする
　  - localstrageに保存されているすべてのTodoの読み出し機能
　  - Todoをlocalstrageに保存する
　  - localstrageにあるTodoを削除する
*/

function useStorageFirebase() {
  const [items, setItems] = useState([]);
　
　/* 副作用を使う */
  useEffect(() => {
    const fetchData =  async () => {
      const snap = await db.get();
      setItems(snap.docs.map(doc => (
          {...doc.data(), key: doc.id}
      )));
    };
    fetchData();
  }, []);

  const addItem = async item => {
    await db.doc(`${item.key}`).set({
      text: item.text,
      done: item.done,
    });
    setItems([item,...items]);
  };
  const updateItem = async item => {
    await db.doc(`${item.key}`).update({
      text: item.text,
      done: !item.done,
    });
    setItems(items.map((tmp) => {
      if (tmp.key === item.key)
        tmp.done = !tmp.done;
      return tmp;
    }))
  };
  //
  // const putItems = async items => {
  //   await clearItems();
  //   for(let item of items){
  //     await db.doc(`${item.key}`).set({
  //       text: item.text,
  //       done: item.done,
  //     });
  //   }
  //   setItems(items);
  // };

  const clearItems = async () => {
    for(let item of items){
      await db.doc(item.key).delete();
    }
    setItems([]);
  };

  return [items, addItem, updateItem, clearItems];
}

export default useStorageFirebase; 
