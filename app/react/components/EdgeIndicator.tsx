import { Activity } from 'lucide-react';

import { isoDateFromTimestamp } from '@/portainer/filters/filters';
import { useHasHeartbeat } from '@/react/edge/hooks/useHasHeartbeat';
import { Environment } from '@/react/portainer/environments/types';

import { EnvironmentStatusBadgeItem } from './EnvironmentStatusBadgeItem';

interface Props {
  showLastCheckInDate?: boolean;
  environment: Environment;
}

export function EdgeIndicator({
  environment,

  showLastCheckInDate = false,
}: Props) {
  const isValid = useHasHeartbeat(environment);

  if (isValid === null) {
    return null;
  }

  const associated = !!environment.EdgeID;
  if (!associated) {
    return (
      <span role="status" aria-label="edge-status">
        <EnvironmentStatusBadgeItem aria-label="unassociated">
          <s>associated</s>
        </EnvironmentStatusBadgeItem>
      </span>
    );
  }

  return (
    <span
      role="status"
      aria-label="edge-status"
      className="flex items-center gap-1"
    >
      <EnvironmentStatusBadgeItem
        color={isValid ? 'success' : 'danger'}
        aria-label="edge-heartbeat"
      >
        heartbeat
      </EnvironmentStatusBadgeItem>

      {showLastCheckInDate && !!environment.LastCheckInDate && (
        <span
          className="small text-muted vertical-center"
          aria-label="edge-last-checkin"
          title="Last edge check-in"
        >
          <Activity className="icon icon-sm space-right" aria-hidden="true" />
          {isoDateFromTimestamp(environment.LastCheckInDate)}
        </span>
      )}
    </span>
  );
}
