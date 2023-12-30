import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { createViewerToken } from '@/services/token.service';

export const useViewerToken = (hostId: string) => {
  const [viewerToken, setViewerToken] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [identity, setIdentity] = useState<string>('');

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostId);
        setViewerToken(viewerToken);
        const decoded = jwtDecode<
          JwtPayload & {
            name?: string;
          }
        >(viewerToken);
        const name = decoded?.name;
        const identity = decoded.jti;

        if (identity) {
          setIdentity(identity);
        }
        if (name) {
          setName(name);
        }
      } catch {
        toast.error('Something went wrong.', {
          action: {
            label: 'Dismiss',
            onClick: () => toast.dismiss()
          }
        });
      }
    };
    createToken();
  }, [hostId]);

  return {
    viewerToken,
    name,
    identity
  };
};
