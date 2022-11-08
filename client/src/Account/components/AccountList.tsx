import { FC } from "react";
import AccountTable from "./AccountTable";

const AccountList: FC = () => {
  const data = {
    accounts: [
      {
        updatedAt: 701799,
        total: "300015300000000000000000",
        reserved: "0",
        id: "st92g2PZJu9WEsaBUL3cGoL169CMW6X32LeDtDm7cR1MqAsYH",
        free: "300015300000000000000000",
      },
      {
        updatedAt: 708599,
        total: "13141900000000000000000",
        reserved: "0",
        id: "stAX4x1LL8JK48PcgWEfHFtHYjqWDE5eQM92dNQPj21qLhhP5",
        free: "13141900000000000000000",
      },
      {
        updatedAt: 811396,
        total: "9002000000001132210738",
        reserved: "0",
        id: "st8uDzXV8RtUZ1wTMjJzQm1UVfCt6G6gdhcyXTR4prT2XSJPm",
        free: "9002000000001132210738",
      },
      {
        updatedAt: 811396,
        total: "4904900000000000000000",
        reserved: "0",
        id: "stA7utHHfvdmxo9s9smXVzpyMHQzzstS9b86UzJja91SLqvsQ",
        free: "4904900000000000000000",
      },
      {
        updatedAt: 811396,
        total: "3639200000000014522607",
        reserved: "0",
        id: "st9VPsWXo8wgPpgRpJw7DejAcyvTPhhwF5BEeJ9kSKv7e3JZL",
        free: "3639200000000014522607",
      },
      {
        updatedAt: 811396,
        total: "2440700000000000000000",
        reserved: "0",
        id: "st8SGsqXPhgkA81EpobkwqR221AF6yyQBeZiKeMhPn7Ctq8Wz",
        free: "2440700000000000000000",
      },
      {
        updatedAt: 811396,
        total: "2360800000000065797392",
        reserved: "0",
        id: "st7wNMB66BCAeGpGUrGxY9byG56Fhp6U2KL7rdsEnYu7YpCys",
        free: "2360800000000065797392",
      },
      {
        updatedAt: 708499,
        total: "2119900000001171707549",
        reserved: "0",
        id: "st6Z46hAbEy6Rn2gF9u4TkSdNHKgrkGUUM5uTi5if7zeUHSZX",
        free: "2119900000001171707549",
      },
      {
        updatedAt: 701199,
        total: "1781900000000000000000",
        reserved: "0",
        id: "stAoYpfcDmTif2ufQETDtosaRM8jB3UPL3uVU8ENweiY5LyWY",
        free: "1781900000000000000000",
      },
      {
        updatedAt: 701199,
        total: "1652900000000000000000",
        reserved: "0",
        id: "st93CF2GnvzCsVkKRUsW5MmytpYs3ibVo69tuxbbzKEGQnj5J",
        free: "1652900000000000000000",
      },
    ],
  };

  const accounts = data.accounts;

  return <AccountTable accounts={accounts} />;
};

export default AccountList;
