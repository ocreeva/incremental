import CommandModel, { registerModel } from '@/commands/_/CommandModel';
import { CommandId } from '@/constants';
import type { EntityId } from '@/types';
import type { IDeltaValue, IGameContext, IOperationModel } from '@/types/model';

class ScanModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.Scan;

    protected static override constructOperation(parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel {
        return new ScanModel(parentRoutineId, parentSubroutineId);
    }

    public static override synchronize(time: number) {
        super.synchronize(time);

        this.isInLexicon = true;
    }

    public static override update(time: IDeltaValue, completion: IDeltaValue): void {
        ScanHubModel.update(time, completion);
    }
}

class ScanHubModel extends CommandModel {
    public static override readonly id: CommandId = CommandId.ScanHub;

    private static subLevel = 0;
    private static multiplier = 1;
    private static remaining = 0.2;

    public static override update(_time: IDeltaValue, completion: IDeltaValue) {
        while (completion.hasUnallocated && this.level < 1) {
            this.remaining -= completion.allocate(this.remaining);

            if (this.remaining <= 0) {
                this.subLevel += 1;
                if (this.subLevel >= 5) {
                    this.level += 1;
                    this.subLevel = 0;
                }

                this.updateMultiplier();
                this.remaining = 0.2 * this.multiplier;
            }
        }

        this.progress = ((this.subLevel + 1) / 5) - (this.remaining / this.multiplier);
    }

    public static async initializeAsync(game: IGameContext): Promise<void> {
        await super.initializeAsync(game);

        this.subLevel = Math.floor(5 * this.progress);
        this.updateMultiplier();

        const target = (this.subLevel + 1) / 5;
        const needed = target - this.progress;
        this.remaining = needed * this.multiplier;
    }

    private static updateMultiplier(): void {
        this.multiplier = 5 * (this.level + 1) * (this.subLevel + 1);
    }
}

registerModel(ScanModel);
registerModel(ScanHubModel);
