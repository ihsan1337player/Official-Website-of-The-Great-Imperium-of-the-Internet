import { useState } from "react";
import { 
  useListLaws, 
  useCreateLaw, 
  useUpdateLaw, 
  useDeleteLaw, 
  useGetMyProfile,
  getListLawsQueryKey,
  getGetMyProfileQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, ChevronUp, Trash2, Edit2, X, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const lawSchema = z.object({
  numeral: z.string().min(1, "Numeral is required"),
  content: z.string().min(1, "Content is required"),
  displayOrder: z.coerce.number().int().min(1),
});

export default function Laws() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const qc = useQueryClient();
  const { toast } = useToast();

  const profileQuery = useGetMyProfile({ query: { retry: false, enabled: true, queryKey: getGetMyProfileQueryKey() } });
  const isHeadAdmin = profileQuery.data?.isHeadAdmin ?? false;

  const { data: laws, isLoading } = useListLaws();

  const createMutation = useCreateLaw({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getListLawsQueryKey() });
        setIsFormOpen(false);
        form.reset();
        toast({ title: "Law Enacted", description: "The new decree has been established." });
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to enact law.", variant: "destructive" });
      }
    }
  });

  const form = useForm<z.infer<typeof lawSchema>>({
    resolver: zodResolver(lawSchema),
    defaultValues: {
      numeral: "",
      content: "",
      displayOrder: (laws?.length || 0) + 1,
    },
  });

  function onSubmit(values: z.infer<typeof lawSchema>) {
    createMutation.mutate({ data: values });
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary bg-primary inline-block px-8 py-4 border-4 border-secondary shadow-xl uppercase tracking-widest">
            Laws
          </h1>
          <p className="mt-8 text-primary uppercase tracking-widest text-sm font-bold bg-secondary/20 inline-block px-4 py-2 rounded-sm border border-secondary/50">
            The Immutable Decrees of the Imperium
          </p>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 md:p-8 border-l-8 border-primary/30 shadow-sm flex items-center gap-6">
                  <Skeleton className="h-16 w-16" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
          ) : laws && laws.length > 0 ? (
            laws.map((law) => (
              <LawCard key={law.id} law={law} isHeadAdmin={isHeadAdmin} />
            ))
          ) : (
            <div className="text-center p-12 bg-white border-2 border-dashed border-border text-muted-foreground font-serif">
              No laws have been recorded in the Imperial Archives yet.
            </div>
          )}
        </div>
        
        {isHeadAdmin && (
          <div className="mt-16 bg-white border-2 border-primary shadow-md">
            <button 
              onClick={() => {
                setIsFormOpen(!isFormOpen);
                if (!isFormOpen) {
                  form.setValue("displayOrder", (laws?.length || 0) + 1);
                }
              }}
              className="w-full flex items-center justify-between p-4 bg-primary/5 text-primary hover:bg-primary/10 transition-colors font-bold uppercase tracking-wider"
            >
              <span>Add New Law</span>
              {isFormOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            {isFormOpen && (
              <div className="p-6 border-t-2 border-primary/20">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="numeral"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-primary uppercase text-xs tracking-wider">Roman Numeral</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. VII" className="border-primary/30 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="displayOrder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-primary uppercase text-xs tracking-wider">Order</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" className="border-primary/30 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-primary uppercase text-xs tracking-wider">Law Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="State the immutable law..." 
                              className="border-primary/30 focus-visible:ring-primary" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      disabled={createMutation.isPending}
                      className="w-full bg-primary text-secondary hover:bg-primary/90 uppercase font-bold tracking-widest"
                    >
                      {createMutation.isPending ? "Enacting..." : "Enact Law"}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </div>
        )}

        <div className="mt-16 text-center text-muted-foreground font-serif italic border-t border-border pt-8">
          Violation of these decrees may result in immediate expulsion from the Imperium.
        </div>
      </div>
    </div>
  );
}

function LawCard({ law, isHeadAdmin }: { law: any, isHeadAdmin: boolean }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editNumeral, setEditNumeral] = useState(law.numeral);
  const [editContent, setEditContent] = useState(law.content);
  const [editOrder, setEditOrder] = useState(law.displayOrder.toString());
  
  const qc = useQueryClient();
  const { toast } = useToast();

  const updateMutation = useUpdateLaw({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getListLawsQueryKey() });
        setIsEditing(false);
        toast({ title: "Law Amended", description: "The decree has been updated." });
      }
    }
  });

  const deleteMutation = useDeleteLaw({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getListLawsQueryKey() });
        toast({ title: "Law Abolished", description: "The decree has been removed." });
      }
    }
  });

  if (isEditing) {
    return (
      <div className="bg-white p-6 md:p-8 border-l-8 border-secondary shadow-md relative overflow-hidden">
        <div className="space-y-4 relative z-10">
          <div className="flex gap-4">
            <div className="w-24">
              <label className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">Numeral</label>
              <Input 
                value={editNumeral} 
                onChange={e => setEditNumeral(e.target.value)} 
                className="font-serif font-bold text-xl border-secondary focus-visible:ring-secondary text-center" 
              />
            </div>
            <div className="w-24">
              <label className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">Order</label>
              <Input 
                type="number"
                value={editOrder} 
                onChange={e => setEditOrder(e.target.value)} 
                className="border-secondary focus-visible:ring-secondary text-center" 
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">Content</label>
            <Textarea 
              value={editContent} 
              onChange={e => setEditContent(e.target.value)} 
              className="font-serif font-medium text-lg border-secondary focus-visible:ring-secondary min-h-[100px]" 
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                setEditNumeral(law.numeral);
                setEditContent(law.content);
                setEditOrder(law.displayOrder.toString());
              }}
              disabled={updateMutation.isPending}
            >
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
            <Button 
              onClick={() => updateMutation.mutate({ 
                id: law.id, 
                data: { numeral: editNumeral, content: editContent, displayOrder: parseInt(editOrder, 10) } 
              })}
              disabled={updateMutation.isPending}
              className="bg-primary text-secondary hover:bg-primary/90"
            >
              <Check className="w-4 h-4 mr-2" /> {updateMutation.isPending ? "Saving..." : "Save Law"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 border-l-8 border-primary shadow-md flex items-center gap-6 md:gap-8 transform transition-transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 transform rotate-45 translate-x-16 -translate-y-16 pointer-events-none"></div>
      
      {isHeadAdmin && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors bg-white shadow-sm border border-border rounded-sm"
            title="Edit Law"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <DeleteButton 
            onDelete={() => deleteMutation.mutate({ id: law.id })} 
            isDeleting={deleteMutation.isPending}
          />
        </div>
      )}
      
      <span className="text-5xl md:text-6xl font-serif font-bold text-secondary select-none border-r-2 border-secondary/40 pr-6 md:pr-8 min-w-[80px] text-center">
        {law.numeral}
      </span>
      <p className="text-xl md:text-2xl text-foreground font-serif font-medium relative z-10 leading-snug">
        {law.content}
      </p>
    </div>
  );
}

function DeleteButton({ onDelete, isDeleting }: { onDelete: () => void, isDeleting: boolean }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2 bg-red-50 p-1 border border-red-200 rounded-sm shadow-sm">
        <span className="text-xs font-bold text-red-700 uppercase px-1">Confirm?</span>
        <button 
          onClick={onDelete}
          disabled={isDeleting}
          className="text-xs bg-red-600 text-white px-2 py-1 font-bold hover:bg-red-700 disabled:opacity-50"
        >
          Yes
        </button>
        <button 
          onClick={() => setConfirming(false)}
          disabled={isDeleting}
          className="text-xs bg-white text-gray-700 border px-2 py-1 font-bold hover:bg-gray-100 disabled:opacity-50"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => setConfirming(true)}
      className="p-2 text-muted-foreground hover:text-red-600 transition-colors bg-white shadow-sm border border-border rounded-sm"
      title="Abolish Law"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
