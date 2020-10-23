import * as React from "react";
import { Query as ApolloQuery } from "react-apollo";

export interface QueryProps {
    query: any;
    type?: 'object' | 'array';
    variables?: any;
    loading?: React.ReactNode | string;
    nodata?: React.ReactNode | string;
    error?: (e: any) => React.ReactNode | string;
    render: (data: any) => any;
}

export class Query<T extends any> extends React.Component<QueryProps, any> {
    render() {
        const { query, variables, render, type = 'array', nodata } = this.props;
        return <>
            <ApolloQuery query={query} variables={variables}>
                {(({ data, loading, error = null }) => {
                    if (loading) {
                        return this.props.loading || '';
                    }

                    if (error) {
                        console.error('Failed to load section', error);
                        return this.props.error ?
                            this.props.error(error) :
                            <p>Something went wrong. Please try again.</p>;
                    }

                    if (!data) {
                        return nodata ? nodata : <p>No data</p>;
                    }

                    const subData = Object.values(data)[0];
                    return render((type === 'array' ? subData : (subData[0] ?? {})) as T);
                })}
            </ApolloQuery>
        </>;
    }
}
