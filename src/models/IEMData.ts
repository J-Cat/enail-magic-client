export interface IEMData {
    readonly temperature: number;
    readonly status: boolean;
    readonly profileIndex: number;
    readonly stepIndex: number;
    readonly percentComplete: number;
    readonly stepPercentComplete: number;
}