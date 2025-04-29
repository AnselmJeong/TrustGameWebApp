import React, { useState } from 'react';
import { playGame } from '../services/trust-game';

export default function TestApi() {
  const [amount, setAmount] = useState(0);

  const handleTest = async () => {
    alert('Button clicked!'); // 반드시 뜨는지 확인
    try {
      const result = await playGame(amount);
      alert('playGame finished!');
      console.log('[FRONTEND] playGame result:', result);
    } catch (e) {
      alert('playGame error!');
      console.error('[FRONTEND] playGame error:', e);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
      />
      <button onClick={handleTest}>API 호출 테스트</button>
    </div>
  );
}
