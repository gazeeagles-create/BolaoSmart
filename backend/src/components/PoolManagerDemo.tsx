React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, Share2, DollarSign, Calendar, Trophy, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Participant {
  id: string;
  name: string;
  email: string;
  paid: boolean;
  joinedAt: Date;
}

interface Pool {
  id: string;
  name: string;
  quotas: number;
  pricePerQuota: number;
  participants: Participant[];
  createdAt: Date;
  drawDate?: Date;
  numbers?: number[];
}

export function PoolManagerDemo() {
  const [pools, setPools] = useState<Pool[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quotas: 10,
    pricePerQuota: 5,
  });
  const { toast } = useToast();

  const createPool = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome do bolão é obrigatório",
        variant: "destructive",
      });
      return;
    }

    const newPool: Pool = {
      id: Date.now().toString(),
      name: formData.name,
      quotas: formData.quotas,
      pricePerQuota: formData.pricePerQuota,
      participants: [],
      createdAt: new Date(),
    };

    setPools([newPool, ...pools]);
    setFormData({ name: "", quotas: 10, pricePerQuota: 5 });
    setIsCreating(false);

    toast({
      title: "Bolão criado!",
      description: `"${newPool.name}" foi criado com sucesso.`,
    });
  };

  const generateInviteLink = (poolId: string) => {
    const link = `${window.location.origin}/join/${poolId}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: "Link de convite copiado para a área de transferência.",
    });
  };

  const addParticipant = (poolId: string, name: string, email: string) => {
    setPools(pools.map(pool => {
      if (pool.id === poolId && pool.participants.length < pool.quotas) {
        const newParticipant: Participant = {
          id: Date.now().toString(),
          name,
          email,
          paid: false,
          joinedAt: new Date(),
        };
        return {
          ...pool,
          participants: [...pool.participants, newParticipant],
        };
      }
      return pool;
    }));
  };

  const togglePayment = (poolId: string, participantId: string) => {
    setPools(pools.map(pool => {
      if (pool.id === poolId) {
        return {
          ...pool,
          participants: pool.participants.map(participant => 
            participant.id === participantId 
              ? { ...participant, paid: !participant.paid }
              : participant
          ),
        };
      }
      return pool;
    }));
  };

  const getTotalCollected = (pool: Pool) => {
    const paidParticipants = pool.participants.filter(p => p.paid).length;
    return paidParticipants * pool.pricePerQuota;
  };

  const getTotalExpected = (pool: Pool) => {
    return pool.quotas * pool.pricePerQuota;
  };

  return (
    <div className="space-y-6">
      {/* Create New Pool */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Gerenciar Bolões
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isCreating ? (
            <Button onClick={() => setIsCreating(true)} variant="lottery" size="lg">
              Criar Novo Bolão
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="poolName">Nome do Bolão</Label>
                  <Input
                    id="poolName"
                    placeholder="Ex: Bolão da Empresa"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quotas">Número de Cotas</Label>
                  <Input
                    id="quotas"
                    type="number"
                    min="2"
                    max="100"
                    value={formData.quotas}
                    onChange={(e) => setFormData({...formData, quotas: parseInt(e.target.value) || 10})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Valor por Cota (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    step="0.50"
                    value={formData.pricePerQuota}
                    onChange={(e) => setFormData({...formData, pricePerQuota: parseFloat(e.target.value) || 5})}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={createPool} variant="default">
                  Criar Bolão
                </Button>
                <Button onClick={() => setIsCreating(false)} variant="outline">
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Pools */}
      <div className="space-y-4">
        {pools.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum bolão criado ainda</p>
            </CardContent>
          </Card>
        ) : (
          pools.map((pool) => (
            <Card key={pool.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    {pool.name}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateInviteLink(pool.id)}
                    className="gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Pool Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Informações do Bolão</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{pool.participants.length}/{pool.quotas} participantes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>R$ {pool.pricePerQuota.toFixed(2)} por cota</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Criado em {pool.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Arrecadado:</span>
                          <span className="font-medium text-green-600">R$ {getTotalCollected(pool).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total esperado:</span>
                          <span className="font-medium">R$ {getTotalExpected(pool).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="font-semibold">Participantes</h3>
                    
                    {pool.participants.length === 0 ? (
                      <p className="text-muted-foreground text-sm">Nenhum participante ainda</p>
                    ) : (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {pool.participants.map((participant) => (
                          <div 
                            key={participant.id} 
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`h-3 w-3 rounded-full ${participant.paid ? 'bg-green-500' : 'bg-gray-400'}`} />
                              <div>
                                <p className="font-medium">{participant.name}</p>
                                <p className="text-sm text-muted-foreground">{participant.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={participant.paid ? "default" : "secondary"}>
                                {participant.paid ? "Pago" : "Pendente"}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => togglePayment(pool.id, participant.id)}
                              >
                                {participant.paid ? (
                                  <XCircle className="h-4 w-4 text-destructive" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {pool.participants.length < pool.quotas && (
                      <div className="p-3 border rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">
                          Link de convite: <code className="bg-background p-1 rounded">/join/{pool.id}</code>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
