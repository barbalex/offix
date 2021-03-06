import { ConflictResolutionData } from "../strategies/ConflictResolutionData";
import { ConflictListener } from "../strategies/ConflictListener";
import { ObjectState } from "../state/ObjectState";
import { ConflictResolutionStrategy } from "../strategies/ConflictResolutionStrategy";

/**
 *
 */
export interface ConflictHandlerOptions {
    /**
     * Data before client and server changes
     */
    base: ConflictResolutionData;
    /**
     * Client side changes (variables sent to GraphQL engine)
     */
    client: ConflictResolutionData;

    /**
     * Server side changes since the last edit the client knew about
     */
    server: ConflictResolutionData;

    /**
     * Strategy used to resolve this conflict if needed
     */
    strategy: ConflictResolutionStrategy;

    /**
     * Object state interface used to check how the conflicts are detected
     */
    objectState: ObjectState;

    /**
     * Name of the operation used to retrieve the data
     */
    operationName: string;

    /**
     * Listener for server side conflicts
     */
    listener?: ConflictListener;
}
