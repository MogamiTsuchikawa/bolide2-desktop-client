const Connection = () => {
  return (
    <div>
      <div className="field-row">
        <label htmlFor="server-url-text">接続先URL</label>
        <input id="server-url-text" type="text" className="w-[300px]" />
        <button>クリップボードから貼付</button>
        <button>URLチェック</button>
      </div>
    </div>
  );
};

export default Connection;
