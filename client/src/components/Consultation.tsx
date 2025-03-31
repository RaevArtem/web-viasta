import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertContactForm, insertContactFormSchema } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";

const Consultation = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<InsertContactForm>({
    resolver: zodResolver(insertContactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      area: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: InsertContactForm) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({
        title: "Заявка отправлена",
        description: "Наш специалист свяжется с вами в ближайшее время",
        variant: "success",
      });
      setFormSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Ошибка отправки",
        description: error.message || "Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: InsertContactForm) {
    mutate(data);
  }

  return (
    <section id="consultation" className="py-12 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Получите бесплатную консультацию
            </h2>
            <p className="mb-6">
              Оставьте заявку, и наш специалист свяжется с вами для подбора оптимального кондиционера под ваш бюджет и помещение.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                <span>Бесплатный выезд специалиста для замеров</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                <span>Индивидуальный подбор оборудования</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                <span>Расчет стоимости монтажа и материалов</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                <span>Скидка 5% при заказе через сайт</span>
              </li>
            </ul>
          </div>

          <div className="md:w-1/2 md:pl-8">
            {formSubmitted ? (
              <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 text-green-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Спасибо за заявку!</h3>
                <p className="mb-4">
                  Ваша заявка успешно отправлена. Наш специалист свяжется с вами в ближайшее время для уточнения деталей.
                </p>
                <Button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-accent hover:bg-accent/90"
                >
                  Отправить еще заявку
                </Button>
              </div>
            ) : (
              <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ваше имя</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Иван Петров" 
                              {...field} 
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Телефон</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+7 (___) ___-__-__" 
                              {...field} 
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Площадь помещения</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={isPending}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите площадь помещения" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="До 20 м²">До 20 м²</SelectItem>
                              <SelectItem value="20-30 м²">20-30 м²</SelectItem>
                              <SelectItem value="30-50 м²">30-50 м²</SelectItem>
                              <SelectItem value="Более 50 м²">Более 50 м²</SelectItem>
                              <SelectItem value="Не знаю">Не знаю, нужна консультация</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Дополнительная информация</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Опишите ваши требования или вопросы" 
                              className="resize-none" 
                              rows={3}
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-accent/90"
                      disabled={isPending}
                    >
                      {isPending ? "Отправка..." : "Получить консультацию"}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultation;
