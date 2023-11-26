import { RecordWithPlaintext, getRecords, useAccount, useOnSessionEvent, useSession } from "@puzzlehq/sdk";
import { useEffect, useState } from "react";
import { useGameStore } from "../store";

export const useInitGame = () => {
  const session = useSession();
  const { account } = useAccount();
  const [gameRecords, setGameRecords] = useState<
    RecordWithPlaintext[] | undefined
  >(undefined);
  const [puzzleRecords, setPuzzleRecords] = useState<
    RecordWithPlaintext[] | undefined
  >(undefined);
  const [utilRecords, setUtilRecords] = useState<
    RecordWithPlaintext[] | undefined
    >(undefined);

  const [setRecords] = useGameStore((state) => [state.setRecords]);

  const fetchRecords = () => {
    // fetch gameRecords
    getRecords({
      filter: { programId: 'wheres_alex_v011.aleo', type: 'unspent' },
    }).then((response) => {
      console.log(response);
      setGameRecords(response.records ?? []);
    });
    // fetch puzzleRecords
    getRecords({
      filter: { programId: 'puzzle_pieces_v011.aleo', type: 'unspent' },
    }).then((response) => {
      console.log(response);
      setPuzzleRecords(response.records ?? []);
    });
    // fetch utilRecords
    getRecords({
      filter: { programId: 'multiparty_pvp_utils_v011.aleo', type: 'unspent' },
    }).then((response) => {
      console.log(response);
      setUtilRecords(response.records ?? []);
    });
  };

  useOnSessionEvent(({ params }) => {
    const eventName = params.event.name;
    if (!['accountSynced'].includes(eventName)) return;
    fetchRecords();
  });

  useEffect(() => {
    if (!account) return;
    fetchRecords();
  }, [account?.address])

  useEffect(() => {
    if (
      gameRecords !== undefined &&
      puzzleRecords !== undefined &&
      utilRecords !== undefined &&
      account
    ) {
      console.log('gameRecords', gameRecords);
      console.log('puzzleRecords', puzzleRecords);
      console.log('utilRecords', utilRecords);
      console.log('account.address', account.address);

      setRecords({ gameRecords, puzzleRecords, utilRecords }, account.address);
    }
  }, [gameRecords, puzzleRecords, utilRecords, account]);
}