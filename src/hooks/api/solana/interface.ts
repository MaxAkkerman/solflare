export interface StakeStatus {
  active: number;
  inactive: number;
  state: 'active' | 'inactive' | 'activating' | 'deactivating';
}

export interface StakeData {
  publicKey: string;
  rentEpoch: number;
  lamports: number;
  stake: number;
  validatorPublicKey: string | null;
}

export interface StakeDataFinalized extends StakeData {
  status: StakeStatus;
}

export interface StakeStatusData {
  publicKey: string;
  status: StakeStatus;
}
