module full_adder (ss,cc,aa,bb,cin);
input aa,bb,cin;
output ss,cc;

wire w1,w2,w3;

half_adder ha1 (.s(w1),.c(ss),.a(aa),.b(bb));
half_adder ha2 (.s(w2),.c(w3),.a(w1),.b(cin));
or or1 (.y(cc),.a(w2),.b(w3));

endmodule

