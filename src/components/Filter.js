/*
  【Filterコンポーネント】
　・該当するTodoをステータス毎にで分けてリスト表示する
　・タブで表示する
　・サポートするステータスは「すべて」「未完了」「完了済み」
*/
function Filter({onClick}) {
    const title = ["すべて", "未完了", "完了済み"];
    const handleClick = (e) => {
        e.preventDefault();
        onClick(e.target.className);
    };
    return (
        <div className="panel-tabs">
            {title.map((item, index) => (
                <a
                    href="#"
                    key={index}
                    className={item}
                    onClick={handleClick}
                >{item}</a>
            ))}
        </div>
    );
}

export default Filter
