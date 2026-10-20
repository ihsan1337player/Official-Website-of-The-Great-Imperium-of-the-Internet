import { useState } from "react";
import { 
  useListAnnouncements, 
  useCreateAnnouncement, 
  useDeleteAnnouncement, 
  useGetMyProfile,
  getListAnnouncementsQueryKey,
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
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const announcementSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z.string().min(1, "Content is required"),
});

export default function Announcements() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const qc = useQueryClient();
  const { toast } = useToast();

  const profileQuery = useGetMyProfile({ query: { retry: false, enabled: true, queryKey: getGetMyProfileQueryKey() } });
  const isHeadAdmin = profileQuery.data?.isHeadAdmin ?? false;

  const { data: announcements, isLoading } = useListAnnouncements();

  const createMutation = useCreateAnnouncement({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getListAnnouncementsQueryKey() });
        setIsFormOpen(false);
        form.reset();
        toast({ title: "Decree Published", description: "The announcement has been posted." });
      },
      onError: (err) => {
        toast({ title: "Error", description: "Failed to post announcement.", variant: "destructive" });
      }
    }
  });

  const deleteMutation = useDeleteAnnouncement({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getListAnnouncementsQueryKey() });
        toast({ title: "Decree Rescinded", description: "The announcement has been deleted." });
      }
    }
  });

  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof announcementSchema>) {
    createMutation.mutate({ data: values });
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-16 px-4 flex flex-col">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary bg-primary inline-block px-8 py-4 border-4 border-secondary shadow-xl uppercase tracking-widest mb-6">
            Announcements
          </h1>
          <p className="text-primary uppercase tracking-widest text-sm font-bold bg-secondary/20 inline-block px-4 py-2 border border-secondary/50">
            Official Decrees of the High Command
          </p>
        </div>
        
        {isHeadAdmin && (
          <div className="mb-12 bg-white border-2 border-primary shadow-md">
            <button 
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="w-full flex items-center justify-between p-4 bg-primary/5 text-primary hover:bg-primary/10 transition-colors font-bold uppercase tracking-wider"
              data-testid="toggle-post-decree"
            >
              <span>Post New Decree</span>
              {isFormOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            {isFormOpen && (
              <div className="p-6 border-t-2 border-primary/20">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-primary uppercase text-xs tracking-wider">Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter decree title..." className="border-primary/30 focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-primary uppercase text-xs tracking-wider">Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Draft the official decree..." 
                              className="min-h-[150px] border-primary/30 focus-visible:ring-primary" 
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
                      {createMutation.isPending ? "Publishing..." : "Publish Decree"}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </div>
        )}

        <div className="space-y-8">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 md:p-8 border-l-8 border-primary/30 shadow-sm">
                  <Skeleton className="h-8 w-2/3 mb-4" />
                  <Skeleton className="h-4 w-1/4 mb-6" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ))}
            </div>
          ) : announcements && announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div 
                key={announcement.id} 
                className="bg-white p-6 md:p-8 border-l-8 border-primary shadow-md relative group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 transform rotate-45 translate-x-16 -translate-y-16 pointer-events-none"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-primary leading-tight mb-2">
                      {announcement.title}
                    </h2>
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <span className="font-bold text-foreground">{announcement.authorUsername}</span>
                      <span>•</span>
                      <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {isHeadAdmin && (
                    <DeleteButton 
                      onDelete={() => deleteMutation.mutate({ id: announcement.id })} 
                      isDeleting={deleteMutation.isPending}
                    />
                  )}
                </div>
                
                <div className="prose prose-p:text-foreground max-w-none font-medium whitespace-pre-wrap">
                  {announcement.content}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-16 border-2 border-dashed border-primary/30 rounded-sm shadow-sm flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-20 h-20 bg-muted mx-auto rotate-45 mb-10 border border-border flex items-center justify-center shadow-inner">
                 <div className="w-10 h-10 bg-muted-foreground/10 rotate-45"></div>
              </div>
              <h3 className="text-3xl font-serif font-bold text-primary mb-4">No Official Decrees</h3>
              <p className="text-lg text-muted-foreground max-w-md mx-auto text-center">There are currently no announcements from the High Command. Return later for official updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DeleteButton({ onDelete, isDeleting }: { onDelete: () => void, isDeleting: boolean }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2 bg-red-50 p-1 border border-red-200">
        <span className="text-xs font-bold text-red-700 uppercase px-2">Confirm?</span>
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
      className="text-muted-foreground hover:text-red-600 p-2 transition-colors"
      title="Rescind Decree"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
