import { useRecords } from '@puzzlehq/sdk';

export const useGameRecords = () => {
  const { records } = useRecords({
    filter: {
      programIds: [
        'wheres_jojo_v008.aleo',
        'jojo_pieces_v007.aleo',
        'multiparty_pvp_utils_v015.aleo',
      ],
      type: 'unspent',
    },
    multisig: false,
  });
  const gameNotifications = records?.filter(
    (record) => record.programId === 'wheres_jojo_v008.aleo'
  );
  const puzzleRecords = records?.filter(
    (record) => record.programId === 'jojo_pieces_v007.aleo'
  );
  const utilRecords = records?.filter(
    (record) => record.programId === 'multiparty_pvp_utils_v015.aleo'
  );

  console.log([gameNotifications, puzzleRecords, utilRecords]);

  return { puzzleRecords, gameNotifications, utilRecords };
};
